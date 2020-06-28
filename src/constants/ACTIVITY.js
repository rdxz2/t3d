import COLOR from './COLOR';
import { PlusOutlined, CheckOutlined, CloseOutlined, RollbackOutlined } from '@ant-design/icons';

const ACTIVITY = {
  // number of activity displayed per page
  PAGESIZE: 10,
  // actions
  ACTION: {
    // general
    CREATE: 'create',
    DELETE: 'del',
    // project
    // to do
    CREATE_TAG: 'create_tag',
    DELETE_TAG: 'del_tag',
    EDIT_DESCRIPTION: 'edit_desc',
    EDIT_DETAIL: 'edit_detail',
    EDIT_PRIORITY: 'edit_prio',
    MARK_COMPLETED: 'mark_complete',
    UNMARK_COMPLETED: 'unmark_complete',
    MARK_IMPORTANT: 'mark_important',
    UNMARK_IMPORTANT: 'unmark_important',
    COMMENT: 'comment',
  },
  // timeline color
  COLOR: {
    create: COLOR.PRIMARY,
    del: COLOR.RED,
    complete: COLOR.GREEN,
    reopen: COLOR.PRIMARY,
    create_tag: COLOR.PRIMARY,
    del_tag: COLOR.RED,
  },
  // timeline icon
  ICON: {
    create: PlusOutlined,
    del: CloseOutlined,
    complete: CheckOutlined,
    reopen: RollbackOutlined,
    create_tag: PlusOutlined,
    del_tag: CloseOutlined,
  },
};

export default ACTIVITY;
