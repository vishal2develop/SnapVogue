/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);

const env = process.env.ENV;
const AppSyncId = process.env.API_INSTACLONE_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppSyncId}-${env}`;

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
    nofPosts: 0,
    nofFollowers: 0,
    nofFollowings: 0,
  };

  // Check if already exists -> If not save user to ddb
  if (!(await checkIfUserExists(newUser.id))) {
    await saveUser(newUser);
    console.log(`User ${newUser.id} has been saved to the DB`);
  } else {
    console.log(`User ${newUser.id} already exists`);
  }

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
  const params = {
    TableName,
    Item: {
      ...user,
      createdAt: dateStr,
      updatedAt: dateStr,
      __typename: 'User',
    },
  };
  try {
    const saveUserCommand = new PutCommand(params);
    await documentClient.send(saveUserCommand);
  } catch (e) {
    console.log(e);
  }
};
