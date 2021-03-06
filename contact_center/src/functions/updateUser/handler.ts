import 'source-map-support/register';
import { middyfy } from "@libs/lambda";
import Responses from "../../common/API_Responses";
import Dynamo from "../../common/Dynamo";

const tableName: string = process.env.tableName;

const updateUser = async (event, _context, callback) => {
  console.log(event, 'event')

  if (!event["Details"].Parameters || !event["Details"].Parameters.phoneNumber) {
    return callback(null, Responses._400({ message: "missing the phoneNumber from the DB" }));
  }
  let phoneNumber: string = event["Details"].Parameters.phoneNumber;
  const { firstName, lastName, age } = event['Details'].Parameters  

  const res = await Dynamo.update({
    tableName,
    primaryKey: 'phoneNumber',
    primaryKeyValue: phoneNumber,
    updateFirstName: firstName,
    updateLastName: lastName,
    updateAge: age
  })
  return callback(null, 'It\'s Updated')
}

export const main = middyfy(updateUser);
