/**
 * Base64 encoding implementation for data transfer
 */

class Base64Encoder {
  /**
   * Encodes data to base64
   */
  static encode(data) {
    try {
      const stringData = typeof data === 'string' ? data : JSON.stringify(data);
      return btoa(unescape(encodeURIComponent(stringData)));
    } catch (error) {
      throw new Error(`Base64 encoding failed: ${error.message}`);
    }
  }

  /**
   * Decodes base64 string
   */
  static decode(encodedData, parseJson = false) {
    try {
      if (!this.isValidBase64(encodedData)) {
        throw new Error('Invalid base64 string');
      }
      const decoded = decodeURIComponent(escape(atob(encodedData)));
      return parseJson ? JSON.parse(decoded) : decoded;
    } catch (error) {
      throw new Error(`Base64 decoding failed: ${error.message}`);
    }
  }

  /**
   * Validates base64 string
   */
  static isValidBase64(str) {
    if (!str) return false;
    try {
      return /^[A-Za-z0-9+/]*={0,2}$/.test(str) && str.length % 4 === 0;
    } catch {
      return false;
    }
  }

  /**
   * Chunks data for transfer
   */
  static chunkData(data, chunkSize = 1024 * 1024) {
    try {
      const encoded = this.encode(data);
      const chunks = [];
      for (let i = 0; i < encoded.length; i += chunkSize) {
        chunks.push(encoded.slice(i, i + chunkSize));
      }
      return chunks;
    } catch (error) {
      throw new Error(`Data chunking failed: ${error.message}`);
    }
  }

  /**
   * Reconstructs chunked data
   */
  static reconstructChunks(chunks) {
    try {
      const complete = chunks.join('');
      return this.decode(complete);
    } catch (error) {
      throw new Error(`Chunk reconstruction failed: ${error.message}`);
    }
  }
}

module.exports = Base64Encoder;