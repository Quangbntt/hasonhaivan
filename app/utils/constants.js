export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const JWT_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpd2ViLmhhc29uaGFpdmFuLmNvbVwvYXBpXC92ZXJpZnktb3RwIiwiaWF0IjoxNjE0NTg3MzU3LCJleHAiOjQ4MjcwNTg3MzU3LCJuYmYiOjE2MTQ1ODczNTcsImp0aSI6IjFzVmE1YVlhazllM3pNOGQiLCJzdWIiOjQyMDQyMiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.iVjbtKtU1b6fs60GO4bDRvlO3d7mmsDUQveA349-ViQ';
export const ERP_REPORT = 'ERP_REPORT';
export const APP_PARAM = 'APP_PARAM';
export const DEFAULT_RESPONSE_MESSAGE = {
  500: 'Không lấy được dữ liệu.',
};
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const APP_NAME = process.env.REACT_APP_NAME;
export const APP_MODULE = {
  CORPORATE_RECONCILIATION: 'CORPORATE_RECONCILIATION',
  CONTRACT_RECONCILIATION: 'CONTRACT_RECONCILIATION',
};
export const DATE_TIME_FORMAT = {
  DD_MM_YYYY: 'DD/MM/YYYY',
  DD_MM_YYYY__HH_MM: 'DD/MM/YYYY HH:mm',
  YYYY_MM_DD: 'YYYY-MM-DD',
  HH_MM: 'HH:mm',
};
export const CONTRACT_TYPE = {
  1: 'Lộ trình cố định',
  1.1: 'Đón trả nhân viên',
  1.2: 'Đón trả học sinh',
  1.3: 'Thuê xe tháng',
  1.4: 'Trọn gói km',
  2: 'Lộ trình không cố định',
  2.1: 'Thuê xe tour',
};
