import "../createPostStyles.scss";
import { VscCaseSensitive, VscLink, VscChromeClose } from "react-icons/vsc";
import { BsCameraFill, BsFillCameraReelsFill } from "react-icons/bs";
import { ImQuotesLeft } from "react-icons/im";
import { FaHeadphonesAlt } from "react-icons/fa";
import { SiWechat } from "react-icons/si";
import { IoCloseSharp } from "react-icons/io";
import { useContext } from "react";
import { conManager } from "../context/TumblrContext";
export default function PostTypes() {
  const { view, setView } = useContext(conManager);
  return (
    <div
      className="post-type-background"
      onClick={() => setView({ ...view, postType: false })}
    >
      <div
        className=" post-type-container"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="type pointer"
          onClick={() => setView({ ...view, textPost: true })}
        >
          <div className="icon bg-light">
            <VscCaseSensitive />
          </div>
          Text
        </div>
        <div className="type">
          <div className="icon bg-danger">
            <BsCameraFill className="" />
          </div>
          Photo
        </div>
        <div className="type ">
          <div className="icon bg-warning">
            <ImQuotesLeft />
          </div>
          Quote
        </div>
        <div className="type">
          <div className="icon bg-success">
            <VscLink />
          </div>
          Link
        </div>
        <div className="type">
          <div className="icon bg-info">
            <SiWechat />
          </div>
          Chat
        </div>
        <div className="type">
          <div className="icon audio">
            <FaHeadphonesAlt />
          </div>
          Audio
        </div>
        <div className="type">
          <div className="icon video">
            <BsFillCameraReelsFill />
          </div>
          Video
        </div>
      </div>
    </div>
  );
}
