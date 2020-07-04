import COLOR from './COLOR';
import { convertCollectionToObject } from '../utilities/utlType';

const SELECTOPTIONS = {
  // unredered to do priority: normal
  UNRENDERED_TODO_PRIORITY: 4,
  // to do filter in to do list
  TODO_FILTER: [
    {
      value: 1,
      text: 'Newest',
    },
    {
      value: 2,
      text: 'Oldest',
    },
    {
      value: 3,
      text: 'Important',
    },
  ],
  // to do priority in to do detail
  TODO_PRIORITY: [
    {
      value: 1,
      text: 'Super',
      tagColor: COLOR.BLACK,
    },
    {
      value: 2,
      text: 'Urgent',
      tagColor: COLOR.RED,
    },
    {
      value: 3,
      text: 'High',
      tagColor: COLOR.ORANGE,
    },
    {
      value: 4,
      text: 'Normal',
      tagColor: COLOR.PRIMARY,
    },
    {
      value: 5,
      text: 'Low',
      tagColor: COLOR.GREY,
    },
    {
      value: 6,
      text: 'Lower',
      tagColor: COLOR.GREY_LIGHT,
    },
  ],
};

export const SELECTOPTION = {
  TODO_PRIORITY: convertCollectionToObject(SELECTOPTIONS.TODO_PRIORITY, 'value'),
};

export default SELECTOPTIONS;
