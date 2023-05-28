import { Upload, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload

const VideoUpload = ({ onUpload }) => {
    const getVideo = (e) => {
            if (e.fileList && e.fileList.length > 0) {
                console.log(e)
                onUpload(e.fileList[0].originFileObj)
        }
    }
    return (
    <div>
        <Dragger
            accept="video/*"
            beforeUpload={false}
            showUploadList={false}
            onChange={(e) => getVideo(e)}>
            <p className="ant-upload-drag-icon">
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
            </p>
        </Dragger>
    </div>
    );
}

export default VideoUpload;