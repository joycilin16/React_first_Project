import { Typography } from "antd"

function AppFooter() {
  return (
   <div className="AppFooter">
      <Typography.Link target="_blank" href="www.google.com">Privacy Policy </Typography.Link>
      <Typography.Link target="_blank" href="www.google.com">Terms & Condition  </Typography.Link>
      <Typography.Link target="_blank" href="www.google.com">Return Policy </Typography.Link>
      <Typography.Link target="_blank" href="tel:+123456789">+123456789  </Typography.Link>

   </div>
  )
}
export default AppFooter