const HTTPMETHOD = {
  POST: 'post',
  GET: 'get',
  UPDATE: 'update',
  PATCH: 'patch',
  DELETE: 'delete',
};

export const HTTPMETHOD_WITHOUTBODY = [HTTPMETHOD.GET, HTTPMETHOD.DELETE];

export default HTTPMETHOD;
