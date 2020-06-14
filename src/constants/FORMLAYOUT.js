const FORMLAYOUT = {
  // separate row
  separateRow: {
    body: {
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
    },
    action: {
      wrapperCol: {
        span: 24,
      },
      // style: {
      //   marginBottom: 0,
      // },
    },
  },
  // same row
  sameRow: {
    body: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 16 },
      },
    },
    action: {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 24, offset: 0 },
        md: { span: 24, offset: 0 },
        lg: { span: 16, offset: 8 },
      },
      style: {
        marginBottom: 0,
      },
    },
  },
};

export default FORMLAYOUT;
