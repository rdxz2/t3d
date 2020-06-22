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

  // END -- LISTENER REGISTRATION

  // START -- EMITTERS

  // user entering project
  emitJoin = (data = { projectCode: '', name: '' }, callback) => this.socket.emit('join', data, callback);

  // user leaving project
  emitLeave = (projectCode, callback) => this.socket.emit('leave', projectCode, callback);

  // to do created
  emitToDoCreated = ({ projectCode, description } = {}, callback) => this.socket.emit('todo_created', { projectCode, description }, callback);

  // END -- EMITTERS
}

export default StrmProject;
