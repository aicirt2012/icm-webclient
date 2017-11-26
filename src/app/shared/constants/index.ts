export default {
  server: process.env.SERVER_API_URL,
  socketUrl: process.env.SERVER_SOCKET_URL
};

export enum TaskDialogType {
  create, edit
}

export enum DialogType {
  email, task
}
