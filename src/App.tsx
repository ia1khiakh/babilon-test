import { ConfigProvider, Layout, Modal, Typography, Space } from "antd";
import { observer } from "mobx-react-lite";

import { ConfigPanel } from "./modules/ConfigPanel";
import { NoteEditor } from "./modules/NoteEditor";
import { NotesMenu } from "./modules/NotesMenu";

import { configStore, modalStore, notesMenuStore } from "./store";

const { Header, Sider, Content } = Layout;

export const App = observer(() => {
  const [selectedKey] = notesMenuStore.selectedKeys;

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            backgroundColor: "#dedede",
            boxShadow: "#0004 0px -16px 36px -28px inset",
          }}
        >
          <Space>
            <Typography.Title
              level={4}
              style={{
                display: "inline-block",
                textTransform: "uppercase",
                marginRight: "2em",
              }}
            >
              Babilon Test Notepad App
            </Typography.Title>
            <ConfigPanel />
          </Space>
        </Header>

        <Layout>
          <Sider
            collapsedWidth={0}
            collapsed={configStore.isMenuHidden}
            style={{ backgroundColor: "#eeeeee" }}
          >
            <NotesMenu />
          </Sider>

          <Content style={{ display: "flex", flexDirection: "column" }}>
            {selectedKey && <NoteEditor id={Number(selectedKey)} />}
          </Content>
        </Layout>
      </Layout>

      <Modal {...modalStore.modalProps} />
    </ConfigProvider>
  );
});
