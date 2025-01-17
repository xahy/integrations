import {
  UiNode,
  UiNodeAnchorAttributes,
  UiNodeAttributes,
  UiNodeImageAttributes,
  UiNodeInputAttributes,
  UiNodeScriptAttributes,
  UiNodeTextAttributes
} from '@ory/kratos-client'

/**
 * Returns the node's label.
 *
 * @param attrs
 * @return label
 */
export const getNodeLabel = (node: UiNode): string => {
  const attributes = node.attributes
  if (isUiNodeAnchorAttributes(attributes)) {
    return attributes.title.text
  }

  if (isUiNodeImageAttributes(attributes)) {
    return node.meta.label?.text || ''
  }

  if (isUiNodeInputAttributes(attributes)) {
    if (attributes.label?.text) {
      return attributes.label.text
    }
  }

  return node.meta.label?.text || ''
}

/**
 * A TypeScript type guard for nodes of the type <a>
 *
 * @param attrs
 */
export function isUiNodeAnchorAttributes(
  attrs: UiNodeAttributes
): attrs is UiNodeAnchorAttributes {
  return attrs.node_type === 'a'
}

/**
 * A TypeScript type guard for nodes of the type <img>
 *
 * @param attrs
 */
export function isUiNodeImageAttributes(
  attrs: UiNodeAttributes
): attrs is UiNodeImageAttributes {
  return attrs.node_type === 'img'
}

/**
 * A TypeScript type guard for nodes of the type <input>
 *
 * @param attrs
 */
export function isUiNodeInputAttributes(
  attrs: UiNodeAttributes
): attrs is UiNodeInputAttributes {
  return attrs.node_type === 'input'
}

/**
 * A TypeScript type guard for nodes of the type <span>{text}</span>
 *
 * @param attrs
 */
export function isUiNodeTextAttributes(
  attrs: UiNodeAttributes
): attrs is UiNodeTextAttributes {
  return attrs.node_type === 'text'
}

/**
 * A TypeScript type guard for nodes of the type <script>
 *
 * @param attrs
 */
export function isUiNodeScriptAttributes(
  attrs: UiNodeAttributes
): attrs is UiNodeScriptAttributes {
  return attrs.node_type === 'script'
}

/**
 * Returns a node's ID.
 *
 * @param attributes
 */
export function getNodeId({ attributes }: UiNode) {
  if (isUiNodeInputAttributes(attributes)) {
    return attributes.name
  } else {
    return attributes.id
  }
}

/**
 * Filters nodes by their groups.
 *
 * Will always add default nodes unless `withoutDefaultGroup` is true.
 *
 * @param attrss
 * @param groups
 * @param withoutDefaultGroup
 */
export const filterNodesByGroups = (
  nodes: Array<UiNode>,
  groups?: Array<string> | string,
  withoutDefaultGroup?: boolean
) => {
  if (!groups || groups.length === 0) {
    return nodes
  }

  const search = typeof groups === 'string' ? groups.split(',') : groups
  if (!withoutDefaultGroup) {
    search.push('default')
  }

  return nodes.filter(({ group }) => search.indexOf(group) > -1)
}
