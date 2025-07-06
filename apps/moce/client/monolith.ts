import grpc from '@grpc/grpc-js'
import { MoceMonolithServiceClient } from '@moce/types/monolith'

export const monolith = new MoceMonolithServiceClient(
  process.env.GRPC_HOST,
  grpc.credentials.createInsecure(),
)
