import { Input, Typography, Layout } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

export const NoteEditor = (props: { id: number }) => {
  const note = useLiveQuery(() => db.notes.get(props.id), [props.id]);

  if (!note) return null;
  return (
    <>
      <Typography.Title level={5}>Дата создания:</Typography.Title>
      <Typography.Paragraph style={{ marginLeft: "2em" }}>
        {new Intl.DateTimeFormat("ru-RU", {
          dateStyle: "full",
          timeStyle: "long",
        }).format(new Date(note.lastEditDate))}
      </Typography.Paragraph>

      <Typography.Title level={5}>Текст:</Typography.Title>
      <Input.TextArea
        style={{ flexGrow: "1" }}
        value={note.content}
        onChange={(el) => {
          db.notes.update(note.id as number, {
            content: el.target.value,
            lastEditDate: new Date().toISOString(),
          });
        }}
      />
    </>
  );
};
