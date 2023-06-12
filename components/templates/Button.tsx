const Button = ({data}: any) => {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
            {data}
        </button>
    )
}
export default Button