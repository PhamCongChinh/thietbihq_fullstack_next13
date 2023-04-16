const Dashboard = ({
    children,
}:{
    children: React.ReactNode,
}) => {
    return(
        <section>
            <nav></nav>
            {children}
        </section>
    )
}

export default Dashboard