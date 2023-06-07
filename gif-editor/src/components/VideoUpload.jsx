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
    <div className='p-5 width-100'>
        <Dragger
            accept="video/*"
            beforeUpload={false}
            showUploadList={false}
            onChange={(e) => getVideo(e)}
            
            >
            <p className="ant-upload-drag-icon">
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag video to this area</p>
            <p className="ant-upload-hint">
            Support a single video upload.
            </p>
        </Dragger>
    </div>
    );
}

export default VideoUpload;