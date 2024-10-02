import { memo } from "react";
import React from 'react';
import { Button, Row, Col, Popconfirm } from 'antd';
import { DownloadOutlined, SaveOutlined, CodeOutlined, ContainerOutlined, SolutionOutlined, NotificationOutlined, BgColorsOutlined, UserOutlined, ProfileOutlined, CalendarOutlined } from '@ant-design/icons';
import "./SettingPage.css";
export default memo(function SettingPage({
  version,
  loadProject,
  saveProject,
  openSourcePage,
  selectFilepath,
  downloadCode,
  getChattxt,
  getChatscript,
  changeTheme,
  darktheme,
  showtool,
  setShowtool,
  confirmclear
}) {
  return <div>
        <br />
        <Row justify={"start"} align={"middle"}>
            <span style={{
        marginRight: 5
      }}>当前版本：{version}</span>
            <a href='https://github.com/sanmusen214/arisstudio-blockly/releases' target='_blank'><Button>查看更新</Button></a>
        </Row>
        <br />
        <Row>导入/保存blockly项目</Row>
        <Row justify={"space-between"}>
            <Col>
                <Button className="loadprojectButton"><input type="file" name="file" accept='*' className="projectfile" onChange={loadProject}></input><DownloadOutlined />导入blockly项目</Button>
                <Button onClick={saveProject}><SaveOutlined />保存blockly项目</Button>
            </Col>
            <Col>
                <Popconfirm title="清空积木区" description="这会清空当前积木区内容，记得保存！" onConfirm={confirmclear} onCancel={() => {}} okText="清空！" cancelText="取消">
                    <Button danger>清空积木区</Button>
                </Popconfirm>
            </Col>
        </Row>
        <br />
        <Row>导出脚本</Row>
        <Row>
            {window.wfilepath ? <>当前自动导出: {window.wfilepath}</> : <></>}
        </Row>
        <Row>
            {window.isinWebpageMode ? <></> : <><Button className="loadprojectButton"><input type="file" name="file" accept='text/plain' className="projectfile" onChange={selectFilepath}></input><CodeOutlined />{window.wfilepath ? "重设" : "设定"}自动导出</Button></>}
            
            <Button onClick={downloadCode}><ContainerOutlined />导出脚本</Button>
        </Row>
        {/* <br/>
         <Row>AI语音</Row>
         <Row>
            <Button onClick={getChattxt}><SolutionOutlined/>导出语音文本</Button>
            <Button onClick={getChatscript}><NotificationOutlined/>导出含语音脚本</Button>
         </Row> */}
        <br />
        <Row>显示模式</Row>
        <Row>
            <Button onClick={changeTheme}><BgColorsOutlined />{darktheme ? "转亮色模式" : "转暗黑模式"}</Button>
        </Row>
        <br />
        <Row>
            <Button onClick={() => {
        setShowtool(tool => {
          return !tool;
        });
      }}><CalendarOutlined />{showtool ? "隐藏右侧框" : "显示右侧框"}</Button>
        </Row>
    </div>;
});