const CurrentRatings = () => {
return (
    <div className=" main-box flex flex-col w-full justify-center items-center rounded-xl m-4 pt-4 pb-4 shadow-sm ">
        <div className="text-center">Current Ratings</div>
        <div className="flex flex-row width-full justify-between m-4 gap-4">
            <div className="leetcode">
                <h2>Leetcode</h2>
                <p>Rating: 1500</p>
            </div>
            <div className="codeforces">
                <h2>Codeforces</h2>
                <p>Rating: 1500</p>
            </div>
            <div className="codechef">
                <h2>Codechef</h2>
                <p>Rating: 1500</p>
            </div>
        </div>
    </div>
);
};

export default CurrentRatings;
