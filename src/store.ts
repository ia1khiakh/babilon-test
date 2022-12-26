import { Modal } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { makeAutoObservable } from "mobx";

export const configStore = makeAutoObservable({
  isMenuHidden: false,
  notesShowVariant: "list" as SegmentedValue,

  toggleIsMenuHidden() {
    this.isMenuHidden = !this.isMenuHidden;
  },

  changeNotesShowVariant(value: SegmentedValue) {
    this.notesShowVariant = value;
  },
});

export const modalStore = makeAutoObservable({
  modalProps: { open: false } as Parameters<typeof Modal>[0],
  inputs: {} as Record<string, string>,

  changeInput(fieldName: string, value: string) {
    this.inputs[fieldName] = value;
  },

  showModal(modalProps: Parameters<typeof Modal>[0]) {
    this.inputs = {};

    this.modalProps = modalProps;
    this.modalProps.open = true;
  },

  hideModal() {
    this.inputs = {};

    this.modalProps = {};
    this.modalProps.open = false;
  },
});

export const notesMenuStore = makeAutoObservable({
  selectedKeys: [] as string[],
  updateSelectedKeys(selectedKeys: string[]) {
    this.selectedKeys = selectedKeys;
  },
});
