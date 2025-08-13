import React from "react";

const UserProfile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Bp</h1>
      </div>

      {/* Profile Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">2. Profile</h2>
        <p className="text-gray-600 mb-4">• Settings</p>
        <p className="italic text-gray-500 mb-6">
          You plan all to update? Type list Name
        </p>

        <div className="bg-white p-4 rounded-lg shadow-xs border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-3">
            Personal Informations
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> office@google.com
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span> +47 337 2468 23
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Website:</span> www.office-data.com
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Facebook:</span>{" "}
              www.facebook.com/questions
            </p>
            <p className="text-gray-600">
              <span className="font-medium">X (Twitter):</span> Geometrica
              Twitter
            </p>
          </div>
        </div>
      </div>

      {/* Eric Clark Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Eric Clark</h2>
        <div className="flex space-x-3 mb-6">
          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md text-sm font-medium">
            Enter password
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-sm font-medium">
            Your language
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-sm font-medium">
            Message at
          </button>
        </div>

        {/* Activity Overview */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Activity Overview</h3>
          <table className="w-full max-w-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left text-gray-600 font-medium">
                  Year Summary
                </th>
                <th className="p-2 text-left text-gray-600 font-medium">
                  Value Index
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-2 text-gray-600">142</td>
                <td className="p-2 text-gray-600">23</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
