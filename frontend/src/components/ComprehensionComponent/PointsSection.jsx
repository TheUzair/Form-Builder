import { Input } from "@/components/ui/input";

const PointsSection = ({ points, negativePoints, onPointsChange, onNegativePointsChange }) => {
  return (
    <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-start sm:justify-end gap-4">
      <div className="flex flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex-1 sm:flex-none">
          <div className="flex flex-col">
            <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Points
            </label>
            <div className="relative flex items-center border border-gray-300 rounded-md w-full sm:w-24 md:w-28">
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="0"
                className="w-full px-2 py-1 text-center text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={isNaN(points) ? "" : points}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    onPointsChange(value === "" ? 0 : parseInt(value));
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 sm:flex-none">
          <div className="flex flex-col">
            <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Negative Points
            </label>
            <div className="relative flex items-center border border-gray-300 rounded-md w-full sm:w-24 md:w-28">
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="0"
                className="w-full px-2 py-1 text-center text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-md"
                value={isNaN(negativePoints) ? "" : negativePoints}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    onNegativePointsChange(value === "" ? 0 : parseInt(value));
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsSection;