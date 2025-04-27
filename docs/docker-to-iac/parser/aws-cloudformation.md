---
description: Translate docker docker-compose.yml file into AWS Cloud Formation with DeployStack
menuTitle: AWS CloudFormation
---

# AWS CloudFormation - Parser Full Documentation

The parser for CloudFormation translates the `docker-compose.yml` file into CloudFormation. The parser logic can be found in GitHub inside [docker-to-iac repo](https://github.com/deploystackio/docker-to-iac/blob/main/src/parsers/aws-cloudformation.ts).

## Parser language abbreviation for API

- `languageAbbreviation`: `CFN`.

## Prerequisite to deploy CloudFormation Template

To deploy the CloudFormation template in your AWS account, you need a VPC with internet access. It should also be possible to create ENI ([AWS Elastic Network Interface](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html)) with public IP. The template uses __AWS Fargate__ without an Application Load Balancer to save costs.

If you have the [default VPC](https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html) in your AWS account that should be sufficient.

## Architecture

The architecture deploys an ECS service into a serverless [AWS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html) cluster. An ECS service = service from `docker-compose.yml`. This means if you have two services in your docker-compose file, you will end up deploying two ECS services into your Fargate cluster.

![AWS Architecture](/docs/assets/images/docker-to-iac/aws-fargate.drawio.png)

The tasks within ECS services create an ENI that has a public IP address. Since we do not use an ALB ([Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)), you can only access the tasks via the port and the public IP address.

When creating CloudFormation template, we decided not to use ALB to save costs. You can of course modify the CloudFormation template and add your ALB if needed.

## Security Configuration

### Container Security Groups

For development and testing purposes, the template configures security groups with open TCP ports (0-65535). This configuration enables easy testing but is not recommended for production use. If you plan to use this template in production, modify the security group rules to restrict access to specific ports.

```yaml
SecurityGroupIngress:
  - IpProtocol: tcp
    FromPort: 0
    ToPort: 65535
    CidrIp: 0.0.0.0/0
```

### Container Root Filesystem

To enable writes to ephemeral ECS storage, containers are configured with:

```yaml
ReadonlyRootFilesystem: false
```

## Default output format

- The default output format for this parser: `YAML`.

## File Configuration

The AWS CloudFormation parser generates a single consolidated template:

- `aws-cloudformation.cf.yml` - The comprehensive CloudFormation template that defines all resources including ECS clusters, services, tasks, security groups, and IAM roles

This single-file approach encapsulates the entire infrastructure definition in YAML format, making it ready for immediate deployment through the AWS CloudFormation console, CLI, or other AWS deployment tools.

## Supported Docker Compose Variables

The current version supports the following Docker Compose variables:

For __services__:

- image
- environment
- ports
- command

> [!NOTE]
> The supported variables that are not on this list are ignored. This means that they are not translated by the parser in Infrastructure as Code from `docker-compose.yml` or docker run command.

## Storage Support

The current implementation uses ephemeral storage provided by AWS Fargate. Persistent storage solutions like EFS (Elastic File System) or EBS (Elastic Block Store) are not automatically configured due to complexity with multiple mount points and automated deployment requirements.

For applications requiring persistent storage, consider:

- Using external storage services (e.g., Amazon RDS for databases)
- Manually configuring EBS volumes
- Implementing a custom storage solution

## Multi Services Support

Multi `services` support for CloudFormation: __yes__

Please read more about [multi service support here](/docs/docker-to-iac/multi-services-support.md).

> [!IMPORTANT]
> This CloudFormation template is designed for development and testing environments. For production deployments, review and adjust security groups, storage configuration, and other security settings according to your requirements.
