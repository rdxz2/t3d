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

  // START -- LISTENER REGISTRATION

  // user is joined
  registerJoined = (onJoined) => this.socket.on('joined', onJoined);
  unregisterJoined = () => this.socket.off('joined');

  // user is leaved
  registerLeaved = (onLeaved) => this.socket.on('leaved', onLeaved);
  unregisterLeaved = () => this.socket.off('leaved');

  // to do created
  registerToDoCreated = (onToDoCreated) => this.socket.on('todo_created', onToDoCreated);
  unregisterToDoCreated = () => this.socket.off('todo_created');

  // END -- LISTENER REGISTRATION

  // START -- EMITTERS

  // user entering project
  emitJoin = (data = { projectCode: '', id: '', name: '' }, callback) => this.socket.emit('join', data, callback);

  // user leaving project
  emitLeave = (projectCode, callback) => this.socket.emit('leave', projectCode, callback);

  // creating to do
  emitToDoCreating = (data = { projectCode: '', id: '', description: '', priority: 0 }, callback) => this.socket.emit('todo_creating', data, callback);

  // END -- EMITTERS
}

export default StrmProject;
