/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  console.log('Hey, Inside Post Confirmation Lambda!!!');
  console.log(event);
  if (!event?.request?.userAttributes) {
    console.log('No User Data Available');
    return;
  }
  const {sub, name, email} = event.request.userAttributes;

  const newUser = {
    id: sub,
    name,
    email,
  };

  // Check if already exists

  return event;
};

const checkIfUserExists = async id => {
  const params = {
    TableName,
    Key: {
      id,
    },
  };
  try {
    const getCommand = new GetCommand(params);
    const response = await documentClient.send(getCommand);
    // return a truthy value  - true if user exisits
    return !!response?.Item;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const saveUser = async user => {
  const date = new Date();
  const dateStr = date.toISOString();
  const timestamp = date.getTime();
  const params = {
    TableName,
    Item: {
      ...user,
      createdAt: dateStr,
      updatedAt: dateStr,
      _lastChangedAt: timestamp,
      _version: 1,
      __typename: 'User',
    },
  };
  try {
    const saveUserCommand = new PutCommand(params);
    await documentClient.put(saveUserCommand);
  } catch (e) {
    console.log(e);
  }
};
