
import React, { useState } from "react";
import { useUniverse } from "../hooks/useUniverse";
import "../App.css";

export default function UniverseTab({ name }) {
  const { items, loading } = useUniverse(name);
  const [selectedItem, setSelectedItem] = useState(null);

  if (loading) return <div className="loading">Loading {name}...</div>;

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderArtifactCard = (item) => (
    <div 
      key={item.id}
      onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
      className={`item-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
    >
      <div className="card-header">
        <h3 className="item-name">{item.name || 'Unnamed Artifact'}</h3>
        <span className="item-type">{item.type || 'Unknown Type'}</span>
      </div>
      
      <div className="card-content">
        <p className="item-power">
          <strong>Power:</strong> 
          <span>{item.power || 'Unknown Power'}</span>
        </p>
        <p className="item-created">
          Created: {formatDate(item.createdAt || Date.now())}
        </p>
        <p className="item-id">
          ID: {item.id}
        </p>
      </div>
    </div>
  );

  const renderCreatureCard = (item) => (
    <div 
      key={item.id}
      onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
      className={`item-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
    >
      <div className="card-header">
        <h3 className="item-name">{item.name || 'Unnamed Creature'}</h3>
        <span className="item-species">{item.species || 'Unknown Species'}</span>
      </div>
      
      <div className="card-content">
        <p className="item-element">
          <strong>Element:</strong> 
          <span>{item.element || 'Unknown Element'}</span>
        </p>
        <p className="item-age">
          <strong>Age:</strong> {(item.age !== undefined ? `${item.age} years` : 'Unknown age')}
        </p>
        <p className="item-created">
          Created: {formatDate(item.createdAt || Date.now())}
        </p>
        <p className="item-id">
          ID: {item.id}
        </p>
      </div>
    </div>
  );

  const renderLogCard = (item) => (
    <div 
      key={item.id}
      onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
      className={`item-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
    >
      <div className="card-header">
        <h3 className="item-name">{item.title || 'Untitled Log'}</h3>
        <span className={`item-severity severity-${(item.severity || 'low').toLowerCase()}`}>
          {item.severity || 'Unknown'}
        </span>
      </div>
      
      <div className="card-content">
        <p className="item-description">
          {item.description || 'No description available'}
        </p>
        <p className="item-created">
          Created: {formatDate(item.createdAt || Date.now())}
        </p>
        <p className="item-id">
          ID: {item.id}
        </p>
      </div>
    </div>
  );

  const renderCardContent = (item) => {
    switch(name) {
      case 'artifacts':
        return renderArtifactCard(item);
      case 'creatures':
        return renderCreatureCard(item);
      case 'logs':
        return renderLogCard(item);
      default:
        return (
          <div key={item.id} className="item-card">
            <pre className="item-description">{JSON.stringify(item, null, 2)}</pre>
          </div>
        );
    }
  };

  return (
    <div className="universe-container">
      <h2>{name}</h2>
      <div>
        {items.length > 0 ? (
          items.map(renderCardContent)
        ) : (
          <div className="empty-state">
            No {name} found
          </div>
        )}
      </div>
    </div>
  );
}
