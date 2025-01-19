import DoctorRegistrationForm from '../components/Register/DoctorRegistrationForm';
// ...existing code...

const RegistrationPage = () => {
    // ...existing code...

    return (
        <div className="container ...">
            <div className={"hero min..."}>
                <div className="hero-conte...">
                    <div>
                        <div className="card w-3/5...">
                            <div className="card-body">
                                <div>
                                    <DoctorRegistrationForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
