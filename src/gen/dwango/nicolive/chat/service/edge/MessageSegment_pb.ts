// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file dwango/nicolive/chat/service/edge/MessageSegment.proto (package dwango.nicolive.chat.service.edge, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file dwango/nicolive/chat/service/edge/MessageSegment.proto.
 */
export const file_dwango_nicolive_chat_service_edge_MessageSegment: GenFile = /*@__PURE__*/
  fileDesc("CjZkd2FuZ28vbmljb2xpdmUvY2hhdC9zZXJ2aWNlL2VkZ2UvTWVzc2FnZVNlZ21lbnQucHJvdG8SIWR3YW5nby5uaWNvbGl2ZS5jaGF0LnNlcnZpY2UuZWRnZSJyCg5NZXNzYWdlU2VnbWVudBIoCgRmcm9tGAEgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIpCgV1bnRpbBgCIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASCwoDdXJpGAMgASgJQuYBCiVjb20uZHdhbmdvLm5pY29saXZlLmNoYXQuc2VydmljZS5lZGdlQhNNZXNzYWdlU2VnbWVudFByb3RvUAGiAgVETkNTRaoCIUR3YW5nby5OaWNvbGl2ZS5DaGF0LlNlcnZpY2UuRWRnZcoCIUR3YW5nb1xOaWNvbGl2ZVxDaGF0XFNlcnZpY2VcRWRnZeICLUR3YW5nb1xOaWNvbGl2ZVxDaGF0XFNlcnZpY2VcRWRnZVxHUEJNZXRhZGF0YeoCJUR3YW5nbzo6Tmljb2xpdmU6OkNoYXQ6OlNlcnZpY2U6OkVkZ2ViBnByb3RvMw", [file_google_protobuf_timestamp]);

/**
 * @generated from message dwango.nicolive.chat.service.edge.MessageSegment
 */
export type MessageSegment = Message<"dwango.nicolive.chat.service.edge.MessageSegment"> & {
  /**
   * @generated from field: google.protobuf.Timestamp from = 1;
   */
  from?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp until = 2;
   */
  until?: Timestamp;

  /**
   * @generated from field: string uri = 3;
   */
  uri: string;
};

/**
 * Describes the message dwango.nicolive.chat.service.edge.MessageSegment.
 * Use `create(MessageSegmentSchema)` to create a new message.
 */
export const MessageSegmentSchema: GenMessage<MessageSegment> = /*@__PURE__*/
  messageDesc(file_dwango_nicolive_chat_service_edge_MessageSegment, 0);
