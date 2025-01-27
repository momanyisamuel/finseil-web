import { FC } from 'react'

type VerifyAuthProps = object

const VerifyAuth: FC<VerifyAuthProps> = () => {
  return <div>
    <article>
    <h1>Verify Authentication</h1>
    <p>Enter the one-time password (OTP) sent to your phone.</p>
    <input type="text" placeholder="OTP" />
    <button type="submit">Verify</button>
    </article>
  </div>
}

export default VerifyAuth