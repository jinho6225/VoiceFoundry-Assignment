import "source-map-support/register";
import { middyfy } from "@libs/lambda";
import Responses from "../../common/API_Responses";
import Dynamo from "../../common/Dynamo";

const tableName: string = process.env.tableName;

const getUser = async (event, _context, callback) => {
  console.log(event, 'event')
  
  if (!event["Details"].Parameters || !event["Details"].Parameters.phoneNumber) {
    return callback(null, Responses._400({ message: "missing the phoneNumber from the DB" }));
  }
  let phoneNumber: string = event["Details"].Parameters.phoneNumber.substring(2);

  const user = await Dynamo.get(phoneNumber, tableName).catch((err) => {
    return callback(null, Responses._400({ message: err })
  )});

  if (!user) {
    return callback(null, Responses._400({ message: "no User by phoneNumber" }));
  }
  
  user.statusCode = 200;
  return callback(null, user);
};

export const main = middyfy(getUser);
