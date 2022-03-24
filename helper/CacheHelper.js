import NetInfo from "@react-native-community/netinfo";
import moment from "moment";

async function shouldUpdateCache(
  key,
  data,
  updateDateTime,
  allowedMinutes,
  logOutout
) {
  let connected = false;
  var lastCacheDate = new Date();
  var returnVal = [false, "default"];

  if (!updateDateTime || !data) {
    returnVal = [true, "check1", updateDateTime, data];
  } else {
    lastCacheDate = moment(updateDateTime, "YYYY-MMM-DD HH:mm:ss").toDate();
    console.log("lastCacheDate", lastCacheDate);

    await NetInfo.fetch().then((state) => {
      connected = state.isConnected;
      if (!connected) {
        returnVal = [false, "check 2"];
      } else if (
        moment(lastCacheDate).add(allowedMinutes, "m").toDate() < Date.now()
      ) {
        returnVal = [
          true,
          "check 3",
          moment(
            moment(lastCacheDate).add(allowedMinutes, "m").toDate()
          ).format("YYYY-MMM-DD HH:mm:ss"),
          moment(Date.now()).format("YYYY-MMM-DD HH:mm:ss"),
        ];
      }
    });
  }

  return returnVal;
}

export { shouldUpdateCache };
