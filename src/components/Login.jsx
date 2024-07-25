import './Login.css'

function Login() {
    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-[#002749] mb-6">Login Account</h2>
                <form className="space-y-4" action="#">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="username">Username</label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            type="text"
                            id="username"
                            name="username"
                            required="" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            type="password"
                            id="password"
                            name="password"
                            required=""  />  </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="rememberme" className="flex items-center space-x-2 text-sm">
                            <input
                                name="rememberme"
                                type="checkbox"
                                id="rememberme"
                                defaultValue="forever"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span>Keep me logged in</span>
                        </label>
                        <a href="https://demosakolawp.themesawesome.com/register/" className="text-sm text-indigo-600 hover:text-indigo-500">Already a member?</a>
                    </div>
                    <button type="submit" className="w-full py-3 bg-[#002749] text-white font-semibold rounded-lg hover:bg-[#001f3f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Login
                    </button>
                </form>
            </div>
        </div>



    )
}
export default Login