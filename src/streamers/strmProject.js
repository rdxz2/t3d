import io from 'socket.io-client';

class StrmProject {
  constructor() {
    // connect to server websocket
    this.socket = io.connect(process.env.REACT_APP_DOMAIN_T3DAPI);

    // error listener
    this.socket.on('error', (error) => {
      console.warn('socket error', error);
    });
  }

  // START -- LISTENERS REGISTRATION

  // other user is joined
  registerJoined = (onJoined) => this.socket.on('joined', onJoined);
  unregisterJoined = () => this.socket.off('joined');

  // other user is leaved
  registerLeaved = (onLeaved) => this.socket.on('leaved', onLeaved);
  unregisterLeaved = () => this.socket.off('leaved');

  // other user created to do
  registerTodoCreated = (onTodoCreated) => this.socket.on('todo_created', onTodoCreated);
  unregisterTodoCreated = () => this.socket.off('todo_created');

  // other user created tag
  registerTodoTagCreated = (onTodoTagCreated) => this.socket.on('todotag_created', onTodoTagCreated);
  unregisterTodoTagCreated = () => this.socket.off('todotag_created');

  // other user toggled to do complete tag
  registerTodoCompleteToggled = (onTodoCompleteToggled) => this.socket.on('todocomp_toggled', onTodoCompleteToggled);
  unregisterTodoCompleteToggled = () => this.socket.off('todocomp_toggled');

  // other user toggled to do important tag
  registerTodoImportantToggled = (onTodoImportantToggled) => this.socket.on('todoimp_toggled', onTodoImportantToggled);
  unregisterTodoImportantToggled = () => this.socket.off('todoimp_toggled');

  // other user deleted tag
  registerTodoTagDeleted = (onTodoTagDeleted) => this.socket.on('todotag_deleted', onTodoTagDeleted);
  unregisterTodoTagDeleted = () => this.socket.off('todotag_deleted');

  // other user edited description
  registerTodoDescriptionEdited = (onTodoDescriptionEdited) => this.socket.on('tododesc_edited', onTodoDescriptionEdited);
  unregisterTodoDescriptionEdited = () => this.socket.off('tododesc_edited');

  // other user edited detail
  registerTodoDetailEdited = (onTodoDetailEdited) => this.socket.on('tododetail_edited', onTodoDetailEdited);
  unregisterTodoDetailEdited = () => this.socket.off('tododetail_edited');

  // other user edited priority
  registerTodoPriorityEdited = (onTodoPriorityEdited) => this.socket.on('todoprio_edited', onTodoPriorityEdited);
  unregisterTodoPriorityEdited = () => this.socket.off('todoprio_edited');

  // other user commenting to do
  registerTodoCommented = (onTodoCommented) => this.socket.on('todo_commented', onTodoCommented);
  unregisterTodoCommented = () => this.socket.off('todo_commented');

  // other user edited to do work date
  registerTodoWorkDateEdited = (onTodoWorkDateEdited) => this.socket.on('todoworkdate_edited', onTodoWorkDateEdited);
  unregisterTodoWorkDateEdited = () => this.socket.off('todoworkdate_edited');

  // END -- LISTENERS REGISTRATION

  // START -- EMITTERS

  // this user entering project
  emitJoin = (data = { projectCode: '', id: '', name: '' }, callback) => this.socket.emit('join', data, callback);

  // this user leaving project
  emitLeave = (projectCode, callback) => this.socket.emit('leave', projectCode, callback);

  // this user created to do
  emitTodoCreating = (data = { projectCode: '', todo: {}, activity: {} }, callback) => this.socket.emit('todo_creating', data, callback);

  // this user toggled to do complete
  emitTodoCompleteToggling = (data = { projectCode: '', todo: {}, activity: {} }, callback) => this.socket.emit('todocomp_toggling', data, callback);

  // this user toggled to do important
  emitTodoImportantToggling = (data = { projectCode: '', todo: {}, activity: {} }, callback) => this.socket.emit('todoimp_toggling', data, callback);

  // this user created to do tag
  emitTodoTagCreating = (data = { projectCode: '', tag: '', activity: {} }, callback) => this.socket.emit('todotag_creating', data, callback);

  // this user deleted to do tag
  emitTodoTagDeleted = (data = { projectCode: '', tag: '', activity: {} }, callback) => this.socket.emit('todotag_creating', data, callback);

  // this user edited to do description
  emitTodoDescriptionEditing = (data = { projectCode: '', todo: {}, activity: {} }, callback) => this.socket.emit('tododesc_editing', data, callback);

  // this user edited to do detail
  emitTodoDetailEditing = (data = { projectCode: '', todo: {}, activity: {} }, callback) => this.socket.emit('tododetail_editing', data, callback);

  // this user edited to do priority
  emitTodoPriorityEditing = (data = { projectCode: '', todo: {}, activity: {} }, callback) => this.socket.emit('todoprio_editing', data, callback);

  // this user is commenting a to do
  emitTodoCommenting = (data = { projectCode: '', todo: {}, activity: {} }, callback) => this.socket.emit('todo_commenting', data, callback);

  // this user is editing to do work date
  emitTodoWorkDateEditing = (data = { projectCode: '', todo: {}, activity: {} }, callback) => this.socket.emit('todoworkdate_editing', data, callback);

  // END -- EMITTERS
}

export default StrmProject;
