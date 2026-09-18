const Search = ({ className, width = 26, height = 26, stroke = "white", ...props }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
    >
        <path
            d="M18.057 18.0569L23.7242 23.7241"
            stroke={stroke}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10.973 19.946C15.9287 19.946 19.946 15.9287 19.946 10.973C19.946 6.01736 15.9287 2 10.973 2C6.01736 2 2 6.01736 2 10.973C2 15.9287 6.01736 19.946 10.973 19.946Z"
            stroke={stroke}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default Search;