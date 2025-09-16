import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class Storage {

  supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  async uploadFile(imageFile: File, username: string) {
    const fileName = uuidv4()
    //const { data, error } = await this.supabase.storage
    return this.supabase.storage
      .from('instapic')
      .upload(`${username}/${fileName}`, imageFile)
      .then(response => {
        return response;
      })
      .catch(error => console.error(error))
  }

  getImageUrl(fullPath: string) {
    return `${SUPABASE_URL}/storage/v1/object/public/${fullPath}`;
  }
  
}