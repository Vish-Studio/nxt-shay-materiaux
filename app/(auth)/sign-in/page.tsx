
import FormInput from "@/components/authentication/form-input/form-input";
import Button from "@/components/button/button";

export default function Page() {
    const click = () => {
        console.log('Test')
    }

    return (
        <div className="form-container">
            <form>
                <FormInput title="email" type="email" hint="Enter your email." />
            </form>

            <Button title="Login" type="rounded" />
        </div>
    )
}

