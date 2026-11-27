import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { DailyTable, ReportNav, ReportValue } from '@/components/traffic/report-parts';
import { AdminOverview } from '@/console/overview';
import { readWorkspace } from '@/console/browser-workspace';

export default function Dashboard() {
  const { t, i18n } = useTranslation('dashboard');
  const [days, setDays] = useState<7 | 30>(7);
  const [source, setSource] = useState<typeof import('@/data/traffic')>();
  const [charts, setCharts] = useState<typeof import('@/components/traffic/charts')>();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const onError = () => setFailed(true);
    void import('@/data/traffic').then(setSource, onError);
    void import('@/components/traffic/charts').then(setCharts, onError);
  }, []);

  const report = source?.getTrafficReport(days);
  const locale = i18n.resolvedLanguage;
  const number = new Intl.NumberFormat(locale);
  const percent = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 });
  const shortDate = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', timeZone: 'UTC' });
  const rangeDate = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' });
  const dateLabel = (date: string) => shortDate.format(new Date(date));
  const devices = [
    { key: 'mobile', name: t('mobile'), fill: 'var(--primary)' },
    { key: 'desktop', name: t('desktop'), fill: 'var(--input)' },
  ] as const;

  return (
    <>
    <AdminOverview title={t('common:home')} text={t} state={readWorkspace()} />
    <section className="traffic-report" aria-labelledby="report-title">
      <Helmet><title>{`${t('common:home')} | ${t('common:appName')}`}</title></Helmet>
      {(!failed || report) && <ReportNav label={t('navigation')} overview={t('overview')} charts={t('charts')} daily={t('daily')} />}
      <div className="report-content">
        <div id="overview" tabIndex={-1} className="traffic-intro">
          <div>
            <h2 id="report-title">{t('title')}</h2>
            <div className="traffic-dateline">
              <span className="traffic-sample">{t('sample')}</span>
              {(!failed || report) && <span><ReportValue>{report && `${rangeDate.format(new Date(report.daily[0].date))} – ${rangeDate.format(new Date(report.daily[report.daily.length - 1].date))}`}</ReportValue></span>}
            </div>
          </div>
          <form aria-labelledby="period-title" onSubmit={event => {
            event.preventDefault();
            const button = (event.nativeEvent as SubmitEvent).submitter;
            setDays(button?.getAttribute('value') === '30' ? 30 : 7);
          }}>
            <span id="period-title" className="report-filter-label">{t('period')}</span>
            <div className="traffic-period">
              {([7, 30] as const).map(value => (
                <Button key={value} type="submit" value={value} variant="ghost" aria-pressed={days === value}>
                  {t('days', { count: value })}
                </Button>
              ))}
            </div>
          </form>
        </div>
        {failed ? (
          <p role="alert">{t('loadError')} <a className="inline-flex min-h-11 items-center underline" href="/dashboard">{t('retry')}</a></p>
        ) : (!report || !charts) && <p role="status" className="sr-only">{t('loading')}</p>}

        {(!failed || report) && <>
          <dl className="traffic-metrics" aria-busy={!report}>
            <div><dt>{t('total')}</dt><dd><ReportValue>{report && number.format(report.total)}</ReportValue></dd></div>
            <div><dt>{t('average')}</dt><dd><ReportValue>{report && number.format(report.average)}</ReportValue></dd></div>
            <div><dt>{t('peak')}</dt><dd><ReportValue>{report && number.format(report.peak.visits)}</ReportValue>{' '}
              <small><ReportValue>{report && dateLabel(report.peak.date)}</ReportValue></small></dd></div>
          </dl>

          <div id="charts" tabIndex={-1} className="traffic-charts" aria-busy={!failed && (!report || !charts)}>
            <section className="traffic-panel">
              <h2>{t('trend')}</h2>
              <p className="traffic-description">{t('trendHint')}</p>
              {charts && report ? (
                <charts.TrendChart daily={report.daily.map(row => ({ label: dateLabel(row.date), visits: row.visits }))}
                  title={t('trend')} visits={t('visits')} number={number} />
              ) : !failed && <div className="traffic-trend report-trend-skeleton" aria-hidden="true" />}
            </section>
            <section className="traffic-panel">
              <h2>{t('devices')}</h2>
              <div className="traffic-ring">
                {charts && report ? (
                  <charts.DeviceChart devices={devices.map(device => ({ ...device, value: report[device.key] }))} title={t('devices')} />
                ) : <div className={`traffic-donut${failed ? '' : ' report-ring-skeleton'}`} aria-hidden="true" />}
                <div className="traffic-ring-label" aria-hidden="true">
                  <strong><ReportValue>{report && percent.format(report.mobile / report.total)}</ReportValue></strong><span>{t('mobile')}</span>
                </div>
              </div>
              <dl className="traffic-devices">
                {devices.map(device => (
                  <div key={device.key}>
                    <dt><i aria-hidden="true" style={{ background: device.fill }} />{device.name}</dt>
                    <dd><ReportValue>{report && number.format(report[device.key])}</ReportValue>{' '}
                      <span><ReportValue>{report && percent.format(report[device.key] / report.total)}</ReportValue></span></dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
          <DailyTable title={t('daily')} columns={[t('date'), t('mobile'), t('desktop'), t('visits')]}
            daily={report?.daily} days={days} formatDate={dateLabel} number={number} />
        </>}
      </div>
    </section>
    </>
  );
}
