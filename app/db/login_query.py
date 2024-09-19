import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-2')

def create_table(table_name, key_schema, attribute_definitions):
    try:
        table = dynamodb.create_table(
            TableName=table_name,
            KeySchema=key_schema,
            AttributeDefinitions=attribute_definitions,
            BillingMode='PAY_PER_REQUEST'
        )
        table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
        print(f"Table {table_name} status: {table.table_status}")
    except ClientError as e:
        if e.response['Error']['Code'] == 'ResourceInUseException':
            print(f"Table {table_name} already exists.")
        else:
            print(f"Unexpected error: {e}")

# Create USERDTO table
create_table(
    'USERDTO',
    [{'AttributeName': 'email', 'KeyType': 'HASH'}],
    [{'AttributeName': 'email', 'AttributeType': 'S'}]
)

# Create USERSCHINFO table
create_table(
    'USERSCHINFO',
    [{'AttributeName': 'email', 'KeyType': 'HASH'}],
    [{'AttributeName': 'email', 'AttributeType': 'S'}]
)

# Create WSU_NU table
create_table(
    'WSU_NU',
    [
        {'AttributeName': 'SCHUL_NU', 'KeyType': 'HASH'},
        {'AttributeName': 'SCHUL_DE', 'KeyType': 'RANGE'}
    ],
    [
        {'AttributeName': 'SCHUL_NU', 'AttributeType': 'S'},
        {'AttributeName': 'SCHUL_DE', 'AttributeType': 'S'}
    ]
)