type Pop<T extends any[]> = T extends [...infer R, infer _] ? R : []
