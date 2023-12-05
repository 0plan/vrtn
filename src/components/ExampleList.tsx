import * as React from 'react';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import {useLocation, useNavigate} from 'react-router-dom';

const itemList = [
    {name: 'Store Example', path: '/examples/store-example'},
    {name: 'Router Example', path: '/examples/router-example'},
]
export default function ExampleList() {
    const navigate = useNavigate()
    const location = useLocation()
    const [path, setPath] = React.useState(location.pathname);
    const handleListItemClick = (
        item: { name: string, path: string },
    ) => {
        navigate(item.path)
        setPath(item.path)
    };

    return (
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <List component="nav" aria-label="secondary mailbox folder">
                {itemList.map(item => {
                    return <ListItemButton
                        key={item.path}
                        selected={path === item.path}
                        onClick={() => handleListItemClick(item)}
                    >
                        <ListItemText primary={item.name}/>
                    </ListItemButton>
                })
                }
            </List>
        </Box>
    );
}
