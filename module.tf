provider "aws" {
  region = "eu-west-1"
}

# IAM Role and Policy
resource "aws_iam_role" "lambda_execution" {
  name = "lambda_execution"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy" "lambda_execution" {
  name        = "lambda_execution_policy"
  policy      = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Action    = "logs:CreateLogGroup"
        Resource  = "*"
      },
      {
        Effect    = "Allow"
        Action    = "logs:CreateLogStream"
        Resource  = "*"
      },
      {
        Effect    = "Allow"
        Action    = "logs:PutLogEvents"
        Resource  = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_execution" {
  policy_arn = aws_iam_policy.lambda_execution.arn
  role       = aws_iam_role.lambda_execution.name
}

# S3 Bucket
resource "aws_s3_bucket" "bluedrop_log_bucket" {
  bucket = "cp-original-image-bucket"
}

# S3 Object
resource "aws_s3_bucket_object" "bluedrop_log" {
  bucket = aws_s3_bucket.bluedrop_log_bucket.id
  key    = "log.txt"
  source = "${path.module}/src/log.txt"
}

# Lambda Function
data "archive_file" "logproject_source_archive" {
  type        = "zip"
  source_dir  = "${path.module}/src"
  output_path = "${path.module}/thermosters.zip"
}

resource "aws_lambda_function" "bluedrop_lambda" {
  function_name    = "bluedrop_function"
  role             = aws_iam_role.lambda_execution.arn
  filename         = data.archive_file.logproject_source_archive.output_path
  source_code_hash = data.archive_file.logproject_source_archive.output_base64sha256
  handler          = "sensor.handler"
  runtime          = "nodejs14.x"
  memory_size      = 128
}

# CloudWatch Logs
resource "aws_cloudwatch_log_group" "bluedrop_logs" {
  name = "/aws/lambda/bluedrop_function"
}

