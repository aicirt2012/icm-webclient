export default {
  server: process.env.API_URL,
  socketUrl: process.env.SOCKET_URL
};

export enum TaskDialogType {
  create, edit
}

export enum DialogType {
  email, task
}
