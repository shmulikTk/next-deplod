import Checkbox from "@/components/checkbox/Checkbox";
import { MdMailOutline, MdNotificationsNone, MdOutlineTextsms } from "react-icons/md";

interface NotificationsProps {

};


export default function Notifications({  }: NotificationsProps) {

  return (
    <div className="flex flex-col justify-center h-full mt-6">
        <div className="font-bold mb-1">Manage your notification settings</div>
        <div>We may send you important notifications about your activity outside of your preferred notification settings.</div>

        <div className="flex flex-row items-center mt-6 gap-3">
            <MdMailOutline size="20px" />
            <div>Email Notification</div>
            <Checkbox />
        </div>

        <div className="flex flex-row items-center mt-4 gap-3">
            <MdNotificationsNone size="20px" />
            <div>System Notification</div>
            <Checkbox />
        </div>

        <div className="flex flex-row items-center mt-4 gap-3">
            <MdOutlineTextsms size="20px" />
            <div>SMS Notification</div>
            <Checkbox />
        </div>
    </div>
  )
}
