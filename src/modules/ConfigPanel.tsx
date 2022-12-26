import { observer } from "mobx-react-lite";
import { useLiveQuery } from "dexie-react-hooks";
import { AutoComplete, Button, Input, Segmented, Space } from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  ClearOutlined,
  DeleteOutlined,
  FileAddOutlined,
  LayoutOutlined,
} from "@ant-design/icons";

import { configStore, modalStore, notesMenuStore } from "../store";
import { db } from "../db";

export const ConfigPanel = observer(() => {
  const notes = useLiveQuery(() => db.notes.toArray());

  return (
    <Space size="large">
      <Segmented
        value={configStore.notesShowVariant}
        onChange={(value) => configStore.changeNotesShowVariant(value)}
        options={[
          {
            value: "list",
            icon: <BarsOutlined />,
          },
          {
            value: "kanban",
            icon: <AppstoreOutlined />,
          },
        ]}
      />

      <Button
        shape="round"
        icon={<LayoutOutlined />}
        type={configStore.isMenuHidden ? "default" : "primary"}
        onClick={() => configStore.toggleIsMenuHidden()}
      />

      <Button icon={<ClearOutlined />} onClick={() => db.notes.clear()} />

      <Space.Compact>
        <Button
          icon={<FileAddOutlined />}
          onClick={() => {
            modalStore.showModal({
              title: "Создать документ",
              children: (
                <Input
                  placeholder="Введите название файла"
                  value={modalStore.inputs["filename"]}
                  onChange={(ev) => {
                    modalStore.changeInput("filename", ev.target.value);
                  }}
                />
              ),
              onOk: async () => {
                await db.notes.add({
                  title: modalStore.inputs["filename"],
                  lastEditDate: new Date().toISOString(),
                  content: "",
                });
                modalStore.hideModal();
              },
              onCancel: () => {
                modalStore.hideModal();
              },
            });
          }}
        />
        <Button
          icon={<DeleteOutlined />}
          onClick={() => {
            const [selectedKey] = notesMenuStore.selectedKeys;

            if (selectedKey) {
              db.notes.delete(Number(selectedKey));
            }
          }}
        />

        <AutoComplete
          style={{ width: "20em" }}
          options={notes?.map((note) => ({ ...note, value: note.title }))}
          placeholder="поиск..."
          onSelect={(_, note) =>
            notesMenuStore.updateSelectedKeys([String(note.id)])
          }
          filterOption={(inputValue, option) =>
            !!option &&
            option.title.toLowerCase().includes(inputValue.toLowerCase())
          }
        />
      </Space.Compact>
    </Space>
  );
});
