const HTTPMETHOD = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

export const HTTPMETHOD_WITHOUTBODY = [HTTPMETHOD.GET, HTTPMETHOD.DELETE];

export default HTTPMETHOD;
