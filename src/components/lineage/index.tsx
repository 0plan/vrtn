import createEngine, {
  DiagramModel,
  DefaultNodeModel,
  DefaultPortModel,
  NodeModel,
  DagreEngine,
  DiagramEngine,
  PathFindingLinkFactory,
} from '@projectstorm/react-diagrams';
import { useLayoutEffect, useRef } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoButton, DemoWorkspaceWidget } from './DemoWorkspaceWidget';

function createNode(name): any {
  return new DefaultNodeModel(name, 'rgb(0,192,255)');
}

let count = 0;

function connectNodes(nodeFrom, nodeTo, engine: DiagramEngine) {
  // just to get id-like structure
  count++;
  const portOut = nodeFrom.addPort(new DefaultPortModel(true, `${nodeFrom.name}-out-${count}`, 'Out'));
  const portTo = nodeTo.addPort(new DefaultPortModel(false, `${nodeFrom.name}-to-${count}`, 'IN'));
  return portOut.link(portTo);

  // ################# UNCOMMENT THIS LINE FOR PATH FINDING #############################
  // return portOut.link(portTo, engine.getLinkFactories().getFactory(PathFindingLinkFactory.NAME));
  // #####################################################################################
}

/**
 * Tests auto distribution
 */
function genDagreEngine() {
  return new DagreEngine({
    graph: {
      rankdir: 'RL',
      ranker: 'longest-path',
      marginx: 25,
      marginy: 25,
    },
    includeLinks: true,
    nodeMargin: 25,
  });
}

function autoDistribute(engine: DiagramEngine) {
  const model = engine.getModel();

  const dagreEngine = genDagreEngine();
  dagreEngine.redistribute(model);

  reroute(engine);
  engine.repaintCanvas();
}

function autoRefreshLinks(engine: DiagramEngine) {
  const model = engine.getModel();

  const dagreEngine = genDagreEngine();
  dagreEngine.refreshLinks(model);

  // only happens if pathfing is enabled (check line 29)
  reroute(engine);
  engine.repaintCanvas();
}

function reroute(engine: DiagramEngine) {
  engine.getLinkFactories().getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME).calculateRoutingMatrix();
}

function DemoWidget(props) {
  const { engine } = props;

  useLayoutEffect(() => {
    autoDistribute(engine);
  }, []);

  const redistribute = () => {
    autoDistribute(engine);
  };

  const refreshLinks = () => {
    autoRefreshLinks(engine);
  };

  return (
    <DemoWorkspaceWidget
      buttons={(
        <div>
          <DemoButton onClick={redistribute}>Re-distribute</DemoButton>
          <DemoButton onClick={refreshLinks}>Refresh Links</DemoButton>
        </div>
      )}
    >
      <CanvasWidget engine={engine} className="h-screen w-full" />
    </DemoWorkspaceWidget>
  );
}

export default function () {
  // 1) setup the diagram engine
  const engineRef = useRef(createEngine());
  const engine = engineRef.current;

  // 2) setup the diagram model
  const model = new DiagramModel();

  // 3) create a default nodes
  const nodesFrom: NodeModel[] = [];
  const nodesTo: NodeModel[] = [];

  nodesFrom.push(createNode('from-1'));
  nodesFrom.push(createNode('from-2'));
  nodesFrom.push(createNode('from-3'));

  nodesTo.push(createNode('to-1'));
  nodesTo.push(createNode('to-2'));
  nodesTo.push(createNode('to-3'));

  // 4) link nodes together
  const links = nodesFrom.map((node, index) => connectNodes(node, nodesTo[index], engine));

  // more links for more complicated diagram
  links.push(connectNodes(nodesTo[0], nodesTo[1], engine));
  links.push(connectNodes(nodesTo[1], nodesTo[2], engine));
  links.push(connectNodes(nodesTo[0], nodesTo[2], engine));
  links.push(connectNodes(nodesFrom[0], nodesFrom[2], engine));
  links.push(connectNodes(nodesFrom[0], nodesTo[2], engine));

  // initial random position
  nodesFrom.forEach((node, index) => {
    node.setPosition(index * 70, index * 70);
    model.addNode(node);
  });

  nodesTo.forEach((node, index) => {
    node.setPosition(index * 70, 100);
    model.addNode(node);
  });

  links.forEach((link) => {
    model.addLink(link);
  });
  model.setLocked(true);
  engine.setModel(model);

  return <DemoWidget model={model} engine={engine} />;
}
