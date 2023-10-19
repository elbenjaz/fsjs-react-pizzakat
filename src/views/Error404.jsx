const Error404 = () => {
    return (
        <div className="feedback d-flex align-items-center justify-content-center mx-auto mt-2 text-center">
            <img className="me-4" src="/cat.png" />
            <div className="dialog dialog-right">
                <span>
                    <b>Error 404</b> <br/>
                    Page not found!
                </span>
            </div>
        </div>
    );
};

export default Error404;
