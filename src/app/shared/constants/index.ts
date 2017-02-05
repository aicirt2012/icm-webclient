export default {
    server: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api`
};

export enum TaskDialogType {
  create, edit
}

export enum DialogType {
  email, task
}
