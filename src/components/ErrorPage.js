const ErrorPage = ({error}) => {
    return (
        <>
            {error || <h3>Uh Oh - The page you were looking for doesn't seem to exist</h3>}
            <img src={process.env.PUBLIC_URL + '/404.png'} alt="404 error - page not found"/>
        </>
    )
}

export default ErrorPage;