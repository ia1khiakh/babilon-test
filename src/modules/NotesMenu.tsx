import { InfoCircleOutlined } from "@ant-design/icons";
import { Menu, Space, Typography } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { observer } from "mobx-react-lite";

import { db } from "../db";
import { notesMenuStore } from "../store";

export const NotesMenu = observer(() => {
  const notes = useLiveQuery(() => db.notes.toArray());

  if (!notes) return null;
  if (!notes.length) {
    return (
      <Space.Compact
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        direction="vertical"
      >
        <Typography.Paragraph>
          <InfoCircleOutlined /> У вас нет файлов
        </Typography.Paragraph>
      </Space.Compact>
    );
  }

  return (
    <Menu
      items={notes.map(({ title, id }) => ({ label: title, key: id })) as any}
      selectedKeys={notesMenuStore.selectedKeys}
      onSelect={({ selectedKeys, domEvent }) => {
        notesMenuStore.updateSelectedKeys(selectedKeys);
      }}
    />
  );
});
