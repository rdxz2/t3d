const HTTPMETHOD = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

export const HTTPMETHODS_WITHOUTBODY = [HTTPMETHOD.GET, HTTPMETHOD.DELETE];

export const HTTPMETHODS_WITHOUTQUERYSTRING = [HTTPMETHOD.POST];

export default HTTPMETHOD;
