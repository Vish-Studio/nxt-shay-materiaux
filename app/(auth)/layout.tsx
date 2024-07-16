import StyledAuth from './style';
import './style.scss'

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <main className="auth-page">
            <div className="header">
                <div className="txt">
                    <span>
                        Sign in to your account
                    </span>
                </div>
            </div>
            {children}
        </main>
    )
}